FROM mongo

RUN mkdir -p /data/db

WORKDIR /data/db

EXPOSE 27017

CMD ["mongod"]