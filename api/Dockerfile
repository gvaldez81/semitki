FROM centos:7
LABEL mantainer "developer@celisdelafuente.net"

EXPOSE 8000 3031 9191

ENV PATH="/usr/pgsql-9.6/bin:$PATH"

COPY containerfs/ /semitki

WORKDIR /semitki

RUN yum -y update ; \
  yum -y install epel-release ; \
  yum -y install https://download.postgresql.org/pub/repos/yum/9.6/redhat/rhel-7-x86_64/pgdg-centos96-9.6-3.noarch.rpm ; \
  yum -y install gcc make patch python-pip postgresql96 \
    postgresql96-devel python-devel graphviz graphviz-devel ; \
  pip install virtualenv
RUN  virtualenv ENV ; \
  ENV/bin/pip install --upgrade pip ; \
  ENV/bin/pip install -r requirements.txt ; \
  ENV/bin/pip install newrelic ; \
  cd /semitki/ENV/lib/python2.7/site-packages/rest_framework_jwt ; \
  patch < /semitki/patches/authentication.py.patch ; \
  patch < /semitki/patches/serializers.py.patch ; \
  yum -y remove *-devel make patch

#ENTRYPOINT /semitki/ENV/bin/python

#CMD ["/semitki/api/manage.py", "runserver", "0.0.0.0:8000"]
