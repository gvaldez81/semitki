FROM centos
MAINTAINER developer@celisdelafuente.net

COPY src/ /semitki

WORKDIR /semitki

RUN yum -y update ; \
  yum -y install epel-release ; \
  yum -y install python-pip ; \
  pip install virtualenv ; \
  virtualenv ENV ; \
  ENV/bin/pip install -r requirements.txt

#ENTRYPOINT /semitki/ENV/bin/python

#CMD ["src/main.py"]
