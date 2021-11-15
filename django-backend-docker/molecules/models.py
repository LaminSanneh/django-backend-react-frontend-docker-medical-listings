from django.db import models

class Activity(models.Model):
    id = models.AutoField(primary_key=True)
    type = models.CharField(max_length=250)
    units = models.CharField(max_length=100)
    value = models.FloatField()
    relation = models.CharField(max_length=2)
    target = models.ForeignKey('Target', models.DO_NOTHING)
    molecule = models.ForeignKey('Molecule', models.DO_NOTHING, related_name='activities')

    class Meta:
        db_table = 'activity'

class Molecule(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField()
    max_phase = models.IntegerField()
    structure = models.CharField(max_length=4000)
    inchi_key = models.CharField(max_length=27, unique=True)

    class Meta:
        db_table = 'molecule'
        ordering = ['id']

class Target(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField()
    organism = models.TextField()

    class Meta:
        db_table = 'target'
