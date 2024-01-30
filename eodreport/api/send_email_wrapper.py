from eodreport.models import EODConfig, EndOfDayReport
from masters.models import Location, Games
from datetime import datetime
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
import logging

logger = logging.getLogger("nterdw")


class SendEmailWrapperException(Exception):
    pass


class SendEmailWrapper(object):
    """
    Class to wrap sending of emails
    """
    def __init__(self):
        self.eod_reports = None
        self.config = None
        self.location = None
        self.report_date = None

    def send_eod_report(self, location_id, report_date, shift):
        """
        Sends email
        """
        try:
            self.location = Location.objects.get(pk=location_id)
            self.report_date = datetime.strptime(report_date, "%Y-%m-%d")
            if shift[:2].upper() not in (["AM", "PM"]):
                raise SendEmailWrapperException(f"Invalid shift data {shift}")
            self.eod_reports = EndOfDayReport.objects.filter(report_date=self.report_date)
            logger.debug(f"Got {self.eod_reports.count()} records with date")
            self.eod_reports = self.eod_reports.filter(location=self.location).filter(shift=shift)
            logger.debug(f"Got {self.eod_reports.count()} records with location & shift")

            self.config = EODConfig.objects.get(location=self.location)
            self.__send_email()
            msg = (f" Sent Shift Report for {self.location.location_name}, "
                   f"on {report_date} / for shift {shift} to this distribution list {self.config.distribution_list} "
                   f"successfully")
            logger.info(msg)
            return msg
        except SendEmailWrapperException:
            msg = f" Exception occurred while generating emails. Invalid shift value {shift}. Should only be AM/PM "
            logger.error(msg)
            raise
        except ValueError:
            msg = (f" Exception occurred while generating emails. Invalid report date format {report_date}. "
                   f"Expect YYYY-MM-DD")
            logger.error(msg)
            return SendEmailWrapperException(msg)
        except EODConfig.DoesNotExist:
            msg = f" Exception occurred while generating emails. No configuration found for location : {location_id}"
            logger.error(msg)
            return SendEmailWrapperException(msg)
        except Location.DoesNotExist:
            msg = f" Exception occurred while generating emails. Invalid location sent{location_id}"
            logger.error(msg)
            return SendEmailWrapperException(msg)
        except Exception as ex:
            msg = f" Exception occurred while generating emails {str(ex)}"
            logger.error(msg)
            return SendEmailWrapperException(msg)

    def __send_email(self):
        # Format will be Sunday, 28-Jan-2024
        date_format = "%A, %d-%b-%Y"
        if self.config is not None and self.eod_reports.count() > 0:
            for report in self.eod_reports:
                if report.report_emailed:
                    logger.warning(f"{report.id} was already sent. Request got again")
                    raise SendEmailWrapperException(f"{report.id} - Shift report already emailed")
                subject = (f"Shift End Report:: {self.location.description}/ "
                           f"{datetime.strftime(self.report_date, date_format)}/{report.shift} Shift")
                games = []
                if report.game_status is not None:
                    for game_stat in report.game_status:
                        games.append({
                            "name": SendEmailWrapper.get_game(game_stat['game_id']),
                            "status": game_stat['status'],
                            "details": game_stat['details'] if game_stat['details'] is not None else ''
                        })
                logger.debug(games)
                try:
                    html_body = render_to_string('eodreport/eod_report.html', context={
                        'report': report,
                        'subject': subject,
                        'message': games,
                        'eod_notes': strip_tags(report.eod_notes),
                        'report_date': datetime.strftime(report.report_date, date_format),
                        'location_name': self.location.description,
                        'game_status': games,
                    })
                except Exception as ex:
                    logger.error(f" Failed to load template file... {str(ex)}")
                    raise
                try:
                    distribution_list = self.config.distribution_list if self.config.active else ["jayantha@ntxescape.com"]
                    message = EmailMultiAlternatives(
                        subject=subject,
                        body=strip_tags(html_body),
                        from_email='jksalagundi@gmail.com',
                        to=distribution_list
                    )
                    message.attach_alternative(html_body, "text/html")
                    message.send(fail_silently=False)
                    report.report_emailed = True
                    report.save()
                except Exception as ex:
                    logger.error(f" Failed to email shift end reports due to an exception : {str(ex)}")
                    raise

    @staticmethod
    def get_game(game_id):
        try:
            game = Games.objects.get(pk=game_id)
            return game.name
        except Games.DoesNotExist:
            logger.warning(f"{game_id} is an invalid game. Cannot find")
            return "Game Unknown"
