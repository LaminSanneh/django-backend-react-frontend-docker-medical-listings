from django.urls import path
from . import views

urlpatterns = [
    path('', views.ModeculeAPIListView.as_view(), name='molecule-list'),
    path('<int:pk>/', views.ModeculeAPIDetailsView.as_view(), name='molecule-detail'),
    path('<int:molecule_id>/activities', views.ModeculeActivitiesView.as_view(), name='molecule-activities'),
]
