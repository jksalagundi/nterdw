# Generated by Django 4.2.9 on 2024-01-30 10:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("eodreport", "0010_alter_endofdayreport_created_date_and_more"),
    ]

    operations = [
        migrations.AddConstraint(
            model_name="endofdayreport",
            constraint=models.UniqueConstraint(
                fields=("report_date", "shift"), name="report_date_shift_is_unique"
            ),
        ),
    ]