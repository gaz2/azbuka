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
                      Азбука чисел      
                    </h1> 
                </div>
                </div>      
            </v-card>

            <v-card
              class="mx-auto"
            
              flat style="background-color: transparent;"
            >
              <div>
                  Основной атрибут игры: бочонки и фишки. В интерактивной игре 3 тура. Одновременно 
                  принимают участие 6 гостей. Первая часть игры всем известная игра – ЛОТО, популярная и 
                  увлекательная, правила которой всем известны. Мы усовершенствовали её и привнесли больше 
                  азарта, интриги, ЮМОРА и конечно призов. 
                  Во второй части игрокам предлагается сыграть против Крупье и попытать счастье, если Участник 
                  проигрывает – ему предстоит выпить Штрафную. Штрафных 6 (шесть) – по количеству игроков. 
                  Кульминация игры — это монетка: ОРЕЛ или РЕШКА, в которой участвуют все гости. Тут эмоции и 
                  зашкаливаютJ 
                  Длительность 1 игры 7-8 мин.
                  Победитель 2х игр получает приз. 
                  Приз может выиграть даже тот, у кого на руках 1 фишка, правила игры так и подстроены!

              </div>
            </v-card>
        </v-col>        
      </v-row>
    </v-container>
    <Galeryazbuka />
  </div>
</template>

<script setup>

const title = ref("Азбука чисел ")
const shortTitle = ref("Игры на корпоратив в Санкт-Петербурге")
const description = ref("Игры на корпоратив в Санкт-Петербурге")
const keywords = ref("игры,лото,карты на бочку,коктельное казино,азбука вкусов,азбука чисел,лото,подарок на 23 февраля,подарочная продукция")

</script>
