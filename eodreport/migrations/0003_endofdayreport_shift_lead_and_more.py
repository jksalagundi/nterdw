# Generated by Django 4.2.9 on 2024-01-23 10:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("eodreport", "0002_endofdayreport_eodgamestatus_delete_eodreport"),
    ]

    operations = [
        migrations.AddField(
            model_name="endofdayreport",
            name="shift_lead",
            field=models.CharField(
                default="Shift Lead", max_length=100, verbose_name="Shift Lead"
            ),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name="endofdayreport",
            name="inventory_reorder",
            field=models.CharField(default="No Reorder", max_length=200),
        ),
    ]