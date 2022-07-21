FROM python:3 as base-backend

RUN apt-get update && apt-get upgrade -y \
    && apt-get install -y build-essential \ 
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /app-requirements
WORKDIR /app-requirements
ADD ./requirements.txt /app-requirements/
RUN pip3 install --upgrade pip \
    && pip3 install -Ur requirements.txt 

RUN mkdir -p /app
WORKDIR /app
ADD ./python /app/
WORKDIR /
#RUN chmod +x /app/*.sh

#FROM base-backend as test
#RUN pip install pylint
#RUN pylint --disable=no-error /app/*.py

FROM base-backend as final
RUN python3 -m compileall /app

EXPOSE 80/tcp

ENTRYPOINT ["python3", "-m", "app.app"]
