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
                            color="#282828"
                            text
                            style="margin-top: -10px"
                          >
                            На главную
                          </v-btn>
                        </v-card-actions> 

                </NuxtLink>
                    <h1 class="text-h5 font-weight mb-4 center-black-h1">
                      Подарочная продукция
                      <v-card 
                          class="mx-auto"
                          width="180"
                          height="5"
                          style="background: linear-gradient(rgba(133,140,137), rgba(249,51,52));"
                          >
                      </v-card>

                    </h1>
                </div>        
            </v-card>

            <v-card
              class="mx-auto"
            
              flat style="background-color: transparent;"
            >
              <div>
                  Отдельное внимание уделим «Подарочной продукции» по Имени из 4 и 5 букв. Ее можно 
                  использовать на любой праздник НГ, ДР, 23 февраля или 8 марта. Изготавливаются 
                  корпоративные и специальные, индивидуальные заказы под наборы.

              </div>
            </v-card>
        </v-col>        
      </v-row>
    </v-container>
    <Galerypodarky />
  </div>
</template>

<script setup>

const title = ref("Подарочная продукция")
const shortTitle = ref("Игры на корпоратив в Санкт-Петербурге")
const description = ref("Игры на корпоратив в Санкт-Петербурге")
const keywords = ref("игры,лото,карты на бочку,коктельное казино,азбука вкусов,азбука чисел,лото,подарок на 23 февраля,подарочная продукция")

</script>
