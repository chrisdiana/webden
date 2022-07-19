FROM python

# Create a low priviledged user, no skel copy as we will clone
# the source to this directory (avoid non empty dir warnings)
RUN groupadd -g 999 webden && \
    useradd -r -m -k /dev/null -d /home/webden -u 999 -g webden webden

# Set the working directory as /home/webden
WORKDIR /home/webden

# Clone to the working directory, i.e. /home/webden
RUN git clone https://github.com/chrisdiana/webden .

# Inform that the container will listen on 8080
EXPOSE 8080

# Use the builtin python3 webserver
CMD python3 -m http.server 8080
