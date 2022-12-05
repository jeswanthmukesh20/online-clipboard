FROM python:3.10.6

RUN mkdir /app
COPY . /app
WORKDIR /app
RUN pip install -r requirements.txt
EXPOSE 5000
ENTRYPOINT [ "/bin/bash", "main.sh" ]
