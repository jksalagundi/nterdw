# Generated by Django 4.2.9 on 2024-01-21 16:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("masters", "0005_alter_location_description"),
        ("eodreport", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="EndOfDayReport",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "report_date",
                    models.DateTimeField(auto_now=True, verbose_name="Report Day"),
                ),
                (
                    "shift",
                    models.CharField(max_length=2, verbose_name="AM or PM Shift"),
                ),
                (
                    "traffic_status",
                    models.CharField(max_length=20, verbose_name="Traffic Status"),
                ),
                ("location_cleaned_status", models.CharField(max_length=30)),
                (
                    "games_sold",
                    models.IntegerField(default=0, verbose_name="Games Sold"),
                ),
                (
                    "walkins_declined",
                    models.IntegerField(
                        default=0, verbose_name="Number of Walkins Declined"
                    ),
                ),
                (
                    "cash_in_box",
                    models.IntegerField(default=0, verbose_name="Cash In the Box"),
                ),
                (
                    "inventory_reorder",
                    models.CharField(default="No Reorder", max_length=400),
                ),
                ("eod_notes", models.TextField(default="EOD Notes TBD")),
                ("created_date", models.DateTimeField(auto_now=True)),
                ("modified_date", models.DateTimeField(null=True)),
                (
                    "location",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="masters.location",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="EODGameStatus",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("status", models.CharField(default="Good", max_length=20)),
                ("notes", models.TextField(null=True)),
                (
                    "eod_report",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="eodreport.endofdayreport",
                    ),
                ),
                (
                    "game",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="masters.games"
                    ),
                ),
            ],
        ),
        migrations.DeleteModel(
            name="EODReport",
        ),
    ]