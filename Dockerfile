FROM centos
MAINTAINER developer@celisdelafuente.net

COPY src/ /

WORKDIR /semitki

RUN yum -y update ; \
  yum -y install epel-release ; \
  yum -y install python-pip ; \
  pip install virtualenv ; \
  virtualenv ENV

ENTRYPOINT /semitki/ENV/bin/python

CMD ["src/main.py"]
