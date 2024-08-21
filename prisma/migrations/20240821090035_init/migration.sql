generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model weather {
  id           BigInt  @id
  cloud_pct     BigInt?
  temp          BigInt?
  feels_like    BigInt?
  humidity      BigInt?
  min_temp      BigInt?
  max_temp      BigInt?
  wind_speed    BigInt?
  wind_degrees  BigInt?
  sunrise       BigInt?
  sunset        BigInt?
}

