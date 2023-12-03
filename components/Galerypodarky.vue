<template>
  <div>
    <v-container fluid justify="center" align="center">
        <v-row justify="center" align="center">
          <v-col
            v-for="n in 1"
            :key="i"
            class="auto"
            
          >
            <NuxtImg
              src="/casino1.webp"
              alt="Казино вкусов"
              
              sizes="xs:40vw sm:100vw md:200vw lg:400px"
            
              
            >
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                </v-row>
              </template>
            </NuxtImg>           
          </v-col>
          <v-col
            v-for="n in 1"
            :key="i"
            class="auto"
            
          >
            <NuxtImg
              src="/casino2.webp"
              alt="Казино вкусов"
              
              sizes="xs:40vw sm:100vw md:200vw lg:400px"
            
              
            >
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                </v-row>
              </template>
            </NuxtImg>            
          </v-col>

          <v-col
            v-for="n in 1"
            :key="i"
            class="auto"
            
          >
            <NuxtImg
              src="/casino3.webp"
              alt="Казино вкусов"
              
              sizes="xs:40vw sm:100vw md:200vw lg:400px"
            
              
            >
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                </v-row>
              </template>
            </NuxtImg>           
          </v-col>
          <v-col
            v-for="n in 1"
            :key="i"
            class="auto"
            
          >
            <NuxtImg
              src="/casino4.webp"
              alt="Казино вкусов"
              
              sizes="xs:40vw sm:100vw md:200vw lg:400px"
            
              
            >
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                </v-row>
              </template>
            </NuxtImg>            
          </v-col>
        </v-row>
    </v-container>
  </div>
</template>
