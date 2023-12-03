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
                      Карты на бочку      
                    </h1> 
                </div>
                </div>     
            </v-card>

            <v-card
              class="mx-auto"
            
              flat style="background-color: transparent;"
            >
              <div>
                  Основной атрибут игры: карты и фишки. В интерактивной игре 2 тура. Одновременно принимают 
                  участие 3-е гостей. Обозначим – в эту игру могут играть и дети, и взрослые участники.  
                  Игра юмористическая. Первая часть карточная – эмоциональная. Вторая часть - ставки и ваша 
                  фортуна. Идея игры – ГЛАВНОЕ НЕПРОГАДАТЬ!! Ставки можно делать и на соперника. Вторая часть 
                  настолько веселая и непредсказуемая, что становится не понятно, и вроде вот она победа, а ты 
                  начинаешь проигрывать, да и правила в ней Крупье может менять по ходу игры. Делая ставку – 
                  НЕПРОГАДАЙ:) 
                  Длительность 1 игры 4 мин.
                  Подарки в этой игре обязательны.

              </div>
            </v-card>
        </v-col>        
      </v-row>
    </v-container>
    <Galerykarty />
  </div>
</template>


<script setup>

const title = ref("Карты на бочку")
const shortTitle = ref("Игры на корпоратив в Санкт-Петербурге")
const description = ref("Игры на корпоратив в Санкт-Петербурге")
const keywords = ref("игры,лото,карты на бочку,коктельное казино,азбука вкусов,азбука чисел,лото,подарок на 23 февраля,подарочная продукция")

</script>
