FROM centos
MAINTAINER developer@celisdelafuente.net

EXPOSE 8000

ENV PATH="/usr/pgsql-9.6/bin:$PATH"
COPY api/ /semitki

WORKDIR /semitki

RUN yum -y update ; \
  yum -y install epel-release ; \
  yum -y install https://download.postgresql.org/pub/repos/yum/9.6/redhat/rhel-7-x86_64/pgdg-centos96-9.6-3.noarch.rpm ; \
  yum -y groupinstall 'Development Tools' ; \
  yum -y install python-pip postgresql96 postgresql96-server postgresql96-contrib postgresql96-devel python-devel ; \
  pip install virtualenv ; \
  virtualenv ENV ; \
  ENV/bin/pip install -r requirements.txt

#ENTRYPOINT /semitki/api/ENV/bin/python

#CMD ["manage.py", "runserver", "0.0.0.0:8000"]
