FROM quay.io/centos/centos:9

RUN echo '. /etc/skel/.bashrc' > /root/.bashrc
RUN echo 'alias ll="ls -lh --color=auto"' >> /root/.bashrc
RUN ln -sf /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime
ENV TZ='America/Sao_Paulo'
ENV EDITOR='vim'

COPY . /srv/
WORKDIR /srv

RUN dnf module -y install nodejs:24/common 

RUN npm i

RUN npx sequelize-cli db:create
RUN npx sequelize-cli db:migrate
RUN npx sequelize-cli db:seed:all

CMD ["npm", "run", "dev"]
