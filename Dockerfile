FROM centos
MAINTAINER developer@celisdelafuente.net

COPY api/ /semitki

WORKDIR /semitki

RUN yum -y update ; \
  yum -y install epel-release ; \
  yum -y groupinstall 'Development Tools'
  yum -y install python-pip mariadb mariadb-devel ; \
  pip install virtualenv ; \
  virtualenv ENV ; \
  ENV/bin/pip install -r requirements.txt

#ENTRYPOINT /semitki/ENV/bin/python

#CMD ["src/main.py"]
