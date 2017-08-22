FROM nginx:stable
LABEL mantainer "developer@celisdelafuente.net"

EXPOSE 80

COPY nginx/ /etc/nginx

STOPSIGNAL SIGQUIT

CMD ["nginx", "-g", "daemon off;"]
