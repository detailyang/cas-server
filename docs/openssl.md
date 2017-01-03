  // ca private key openssl genrsa -des3 -out ca.key 4096
  // ca certificate openssl req -new -x509 -days 365 -key ca.key -out ca.crt -sha256

  // server private key openssl genrsa -des3 -out server.key 4096
  // server csr openssl req -new -key server.key -out server.csr -sha256
  // server certificate openssl x509 -req -days 365 -in server.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out server.crt

  // server private key and certificate req -x509 -nodes -sha256 -days 365 -newkey rsa:2048 -keyout example.com.key -out example.com.crt

  // client private key openssl genrsa -des3 -out client.key 1024 -sha256
  // client csr openssl req -new -key client.key -out client.csr
  // client certificate openssl x509 -req -days 365 -in client.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out client.crt
  // client private key and certificate req -x509 -nodes -sha256 -days 365 -newkey rsa:2048 -keyout example.com.key -out example.com.crt

  // client transform pkcs12 格式 openssl pkcs12 -export -clcerts -in client.crt -inkey client.key -out client.p12
