# Generated by Django 4.2.1 on 2023-06-02 21:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0003_orderbookings_location'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orderbookings',
            name='confirmation_code',
        ),
        migrations.AddField(
            model_name='orderbookings',
            name='created_date',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='orderbookings',
            name='modified_date',
            field=models.DateTimeField(null=True),
        ),
    ]
