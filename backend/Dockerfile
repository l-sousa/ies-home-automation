RUN mvn package -Dmaven.test.skip=true
FROM adoptopenjdk/openjdk11:latest
ARG JAR_FILE=./target/homemonitor-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]
