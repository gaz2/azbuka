<template>
  <v-footer
    class="text-center d-flex flex-column" style="background-color: #282828" 
  >

    <div class="text-center">
      <v-container fluid>
        <v-row justify="center" align="center">
          <v-col cols="auto">
            <NuxtLink to="/cazino-vkusov" class="nav-link2">
              <h3 class="center-h2-white">КАЗИНО ВКУСОВ</h3>
                </NuxtLink>
          </v-col>
          <v-col cols="auto">
            <NuxtLink to="/azbuka-chisel" class="nav-link2">
              <h3 class="center-h2-white">АЗБУКА ЧИСЕЛ</h3>
                </NuxtLink>
          </v-col>
          <v-col cols="auto">
            <NuxtLink to="/karty-na-bochku" class="nav-link2">
              <h3 class="center-h2-white">КАРТЫ НА БОЧКУ</h3>
            </NuxtLink>
          </v-col>
          <v-col cols="auto">
            <NuxtLink to="/video" class="nav-link2">
              <h3 class="center-h2-white">ВИДЕО</h3>
            </NuxtLink>
          </v-col>
          
        </v-row>
    </v-container>
    
  </div>
  <v-divider></v-divider>

    <div>
      <NuxtLink to="https://produce-site.ru" class="center-h2-white">
              <strong>All Reserved.@produce-site.ru</strong>
            </NuxtLink>
            <br><span class="center-h2-white">{{ new Date().getFullYear() }}</span>
    </div>
  </v-footer>
</template>

