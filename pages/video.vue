<template>
  <div>
    <br>
    <br>
    <Title>{{ title }}</Title>
    <Meta name="description" :content="description" />
    <Meta name="keywords" :content="keywords" />
    <v-container fluid style="margin-top: 10px;">
      <v-row justify="center" align="center">
        <v-col cols="auto">
          <v-card
              class="mx-auto"
            
              flat style="background-color: transparent;"
            >
              <div class="d-flex flex-column fill-height justify-center align-center text-black-50" >
                <NuxtLink to="/" class="nav-link-black">  
                      <v-card-actions>
                          <v-btn
                              block                     
                              rounded
                              outlined               
                            >
                            <Icon name="formkit:arrowleft" width="20" height="20"/>
                              <p class="center-h2">

                              назад</p>
                            </v-btn>
                        </v-card-actions> 

                </NuxtLink>
                <div style="margin-bottom: 10px;">
                    <h1 class="center-h1">
                      Видео    
                    </h1> 
                </div>
                </div>    
            </v-card>

            <v-card
              class="mx-auto"
            
              flat style="background-color: transparent;"
            >
              <div>
                В этом разделе вы можете посмотреть видеоотчёты с нашых мероприятий!
              </div>
            </v-card>
        </v-col>        
      </v-row>
    </v-container>
    <Video />
  </div>
</template>

<script setup>

const title = ref("Отзывы игры на корпоративах")
const shortTitle = ref("Игры на корпоратив в Санкт-Петербурге")
const description = ref("Игры на корпоратив в Санкт-Петербурге")
const keywords = ref("игры,лото,карты на бочку,коктельное казино,азбука вкусов,азбука чисел,лото,подарок на 23 февраля,подарочная продукция")

</script>
