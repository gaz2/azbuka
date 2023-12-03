<template>
  <div>
    <br>
    <br>
    <Title>{{ title }}</Title>
    <Meta name="description" :content="description" />
    <Meta name="keywords" :content="keywords" />
    <v-container fluid style="background: linear-gradient(rgba(247, 182, 2,0.6), rgba(247, 182, 2, 1));margin-top: 10px;">
      <v-row justify="center" align="center">
        <v-col cols="auto">
          <v-card
              class="mx-auto"
              max-width="400"
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
                    <h2 class="text-h5 font-weight-thin mb-4">
                      Факты обо мне 
                      <v-card 
                          class="mx-auto"
                          width="120"
                          height="5"
                          style="background: linear-gradient(rgba(40, 40, 40, 1), rgba(247, 182, 2,1));"
                          >
                      </v-card>

                    </h2>
                </div>

            </v-card>
            <v-card
              class="mx-auto"
            
              flat style="background-color: transparent;"
            >
              <div>Проведение свадеб в СПб начинается с тщательной подготовки задолго до самого события. Как правило, заказ услуг ведущего должен стать первоочередной целью будущих молодоженов. Именно он будет определять вместе с ними сценарий праздника, обговаривая каждый имеющийся нюанс. У популярных специалистов график может быть плотно расписан на несколько месяцев вперед, поэтому договариваться с тамадой лучше всего заранее.

                </div>
            </v-card>
        </v-col>    
      </v-row>  
    </v-container>
    <Galerysvadba />
    <Anons />
  </div>
</template>

<script setup>

const title = ref("Ведущий на свадьбу")
const shortTitle = ref("Ведущий в Выборге и Санкт-Петербурге")
const description = ref("Ведущий на свадьбу в Выборге и Санкт-Петербурге!")
const keywords = ref("Ведущий на садьбу в Выборге,ведущий на свадьбу с диджеем в Выборге,ведущий на свадьбу Выборг,ведущий на свадьбу СПб,поющий ведущий на свадьбу")

</script>
