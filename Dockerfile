FROM centos
MAINTAINER developer@celisdelafuente.net

EXPOSE 8000

ENV PATH="/usr/pgsql-9.6/bin:$PATH"

COPY ./ /semitki

WORKDIR /semitki

RUN yum -y update ; \
  yum -y install epel-release ; \
  yum -y install https://download.postgresql.org/pub/repos/yum/9.6/redhat/rhel-7-x86_64/pgdg-centos96-9.6-3.noarch.rpm ; \
  yum -y install gcc make python-pip postgresql96 postgresql96-server postgresql96-contrib postgresql96-devel python-devel ; \
  pip install virtualenv
RUN  virtualenv ENV ; \
  ENV/bin/pip install --upgrade pip ; \
  ENV/bin/pip install -r requirements.txt

#ENTRYPOINT /semitki/ENV/bin/python

#CMD ["/semitki/api/manage.py", "runserver", "0.0.0.0:8000"]
