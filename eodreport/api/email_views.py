from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from eodreport.models import EODConfig, EndOfDayReport
from masters.models import Location, Games
from datetime import datetime
from django.core.mail import send_mail
import logging

logger = logging.getLogger("nterdw")


class ShiftException(Exception):
    pass


class SendEmails(APIView):
    """
    View to send emails to configured distribution list
    """

    def __init__(self):
        self.eod_reports = None
        self.config = None
        self.location = None
        self.report_date = None

    def get(self, request, location_id, report_date, shift, format=None):
        """
        Sends email
        """
        try:
            self.location = Location.objects.get(pk=location_id)
            self.report_date = datetime.strptime(report_date, "%Y-%m-%d")
            if shift[:2].upper() not in (["AM", "PM"]):
                raise ShiftException(f"Invalid shift data {shift}")
            self.eod_reports = EndOfDayReport.objects.filter(report_date__date=self.report_date)
            logger.debug(f"Got {self.eod_reports.count()} records with date")
            self.eod_reports = self.eod_reports.filter(location=self.location).filter(shift=shift)
            logger.debug(f"Got {self.eod_reports.count()} records with location & shift")

            self.config = EODConfig.objects.get(location=self.location)
            self.__send_email()
            msg = (f" Sent Shift Report for {self.location.location_name}, "
                   f"on {report_date} / for shift {shift} to this distribution list {self.config.distribution_list} "
                   f"successfully")
            logger.info(msg)
            return Response(status=status.HTTP_200_OK, data={"status": msg})
        except ShiftException:
            msg = f" Exception occurred while generating emails. Invalid shift value {shift}. Should only be AM/PM "
            logger.error(msg)
            return Response(status=status.HTTP_400_BAD_REQUEST, data={'error': msg})
        except ValueError:
            msg = (f" Exception occurred while generating emails. Invalid report date format {report_date}. "
                   f"Expect YYYY-MM-DD")
            logger.error(msg)
            return Response(status=status.HTTP_400_BAD_REQUEST, data={'error': msg})
        except EODConfig.DoesNotExist:
            msg = f" Exception occurred while generating emails. No configuration found for location : {location_id}"
            logger.error(msg)
            return Response(status=status.HTTP_400_BAD_REQUEST, data={'error': msg})
        except Location.DoesNotExist:
            msg = f" Exception occurred while generating emails. Invalid location sent{location_id}"
            logger.error(msg)
            return Response(status=status.HTTP_400_BAD_REQUEST, data={'error': msg})
        except Exception as ex:
            msg = f" Exception occurred while generating emails {str(ex)}"
            logger.error(msg)
            return Response(status=status.HTTP_400_BAD_REQUEST, data={'error': msg})

    def __send_email(self):
        # Format will be Sunday, 28-Jan-2024
        date_format = "%A, %d-%b-%Y"
        if self.config is not None and self.eod_reports.count() > 0:
            for report in self.eod_reports:
                subject = (f"Shift End Report:: {self.location.location_name.upper()}/ "
                           f"{datetime.strftime(self.report_date, date_format)}/{report.shift} Shift")
                message = f"\n{'-' * 130}\n"
                message += f"\tReport filed by : {report.shift_lead}\n"
                message += f"{'-' * 130}\n"
                message += f"\tTraffic Status: {report.traffic_status}\n"
                message += f"\tLocation Cleaned: {report.location_cleaned_status}\n"
                message += f"\tGames Sold: {report.games_sold}\n"
                message += f"\tCustomer Walk-ins Declined: {report.walkins_declined}\n"
                message += f"\tInventory Re-ordered: {report.inventory_reorder}\n"
                message += f"\tCash at Location: ${report.cash_in_box}\n"
                message += f"{'-' * 130}\n"
                message += f"\tShift Lead Notes: {report.eod_notes[:100]}\n"
                message += f"{'-' * 130}\n"
                if report.game_status is not None:
                    for status in report.game_status:
                        message += (f"\t\t{SendEmails.get_game(status['game_id'])}: "
                                    f"{status['status']} - {status['details']}\n")
                message += f"{'-' * 130}\n"

                logger.debug(subject)
                logger.debug(message)
                # Now sending email...
                send_mail(subject=subject,
                          message=message,
                          from_email="jayantha@gmail.com",
                          recipient_list=["jayantha@ntxescape.com"])

    @staticmethod
    def get_game(game_id):
        try:
            game = Games.objects.get(pk=game_id)
            return game.name
        except Games.DoesNotExist:
            logger.warning(f"{game_id} is an invalid game. Cannot find")
            return "Game Unknown"
