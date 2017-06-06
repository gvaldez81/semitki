from django_cron import CronJobBase, Schedule
from sonetworks.janitor import sweep

class SemitkiCron(CronJobBase):
    RUN_EVERY_MINS = 1

    schedule = Schedule(run_every_mins=RUN_EVERY_MINS)
    code = 'sweeping'

    def do(self):
        sweep()
