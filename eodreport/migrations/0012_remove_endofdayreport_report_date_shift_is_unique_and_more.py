# Generated by Django 4.2.9 on 2024-01-30 11:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("eodreport", "0011_endofdayreport_report_date_shift_is_unique"),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name="endofdayreport",
            name="report_date_shift_is_unique",
        ),
        migrations.AddConstraint(
            model_name="endofdayreport",
            constraint=models.UniqueConstraint(
                fields=("report_date", "shift", "location"),
                name="report_date_shift_location_is_unique",
            ),
        ),
    ]