<template>
  <div>
    <v-container fluid style="background: linear-gradient(rgba(133,140,137,0.8), rgba(255,255,255,1));">
      <v-row justify="center" align="center">

        <v-col cols="auto">
              <v-card
                  class="mx-auto"
                  max-width="400"
                  max-height="400"
                  flat style="background-color: transparent;"
                >
                  <NuxtLink to="/cazino-vkusov" class="nav-link-black">
                    <div class="d-flex flex-column fill-height justify-center align-center text-black-50" >
                          <v-btn
                            border
                            class="text-center"
                            variant="text"
                          >
                            <h2 class="center-h2">
                            КАЗИНО ВКУСОВ

                          </h2>
                          </v-btn>
                      </div>

                          <NuxtImg
                            format="webp"
                            class="white--text align-end"
                            sizes="xs:320vw sm:640vw md:768vw lg:1024vw xl:1280vw xxl:1536vw"
                            width="300px"
                            height="200px"
                            alt="казино вкусов"
                            src="/casino5.webp" />
                  </NuxtLink> 
                </v-card>
        </v-col>
        
        <v-col cols="auto">
          <v-card
              class="mx-auto"
              max-width="400"
              flat style="background-color: transparent;"
            >
              <NuxtLink to="/azbuka-chisel" class="nav-link-black">
                <div class="d-flex flex-column fill-height justify-center align-center text-black-50" >
                  <v-btn
                            border
                            class="text-center"
                            variant="text"
                          >
                            <h2 class="center-h2">
                            АЗБУКА ЧИСЕЛ

                          </h2>
                    </v-btn>
                  </div>  
                      <NuxtImg
                        format="webp"
                        class="white--text align-end"
                        sizes="xs:320vw sm:640vw md:768vw lg:1024vw xl:1280vw xxl:1536vw"
                        width="300px"
                        height="200px"
                        alt="азбука чисел"
                        src="/azbuka1.webp" />

              </NuxtLink> 
            </v-card>
        </v-col>

        <v-col cols="auto">
          <v-card
              class="mx-auto"
              max-width="400"
              flat style="background-color: transparent;"
            >
              <NuxtLink to="/karty-na-bochku" class="nav-link-black">
                <div class="d-flex flex-column fill-height justify-center align-center text-black-50" >
                    <v-btn
                            border
                            class="text-center"
                            variant="text"
                          >
                            <h2 class="center-h2">
                            КАРТЫ НА БОЧКУ

                          </h2>
                    </v-btn>
                  </div>
                    
                      <NuxtImg
                        format="webp"
                        class="white--text align-end"
                        sizes="xs:320vw sm:640vw md:768vw lg:1024vw xl:1280vw xxl:1536vw"
                        width="300px"
                        height="200px"
                        alt="карты на бочку"
                        src="/karty1.webp" /> 

              </NuxtLink> 
            </v-card>
        </v-col>

        <v-col cols="auto">
          <v-card
              class="mx-auto"
              max-width="400"
              flat style="background-color: transparent;"
            >
              <NuxtLink to="/video" class="nav-link-black">
                <div class="d-flex flex-column fill-height justify-center align-center text-black-50" >
                  <v-btn
                            border
                            class="text-center"
                            variant="text"
                          >
                            <h2 class="center-h2">
                            ВИДЕО

                          </h2>
                    </v-btn>
                  </div>
                    
                      <NuxtImg
                        format="webp"
                        class="white--text align-end"
                        sizes="xs:320vw sm:640vw md:768vw lg:1024vw xl:1280vw xxl:1536vw"
                        width="300px"
                        height="200px"
                        alt="отзывы"
                        text="jgfjhgfjh"
                        src="/azbuka5.webp" />
              </NuxtLink> 
            </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style>
  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .8;
    position: absolute;
    width: 100%;
  }
</style>