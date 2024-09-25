from django.shortcuts import render
from .. import utils
from ..helpers.User import User

# Create your views here.
def home(request):
    return render(request, "vie-des-campus/index.html")