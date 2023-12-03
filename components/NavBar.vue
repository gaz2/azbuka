<template>
      <v-app-bar height="30px" class="mytabs" flat style="background-color: rgba(255,255,255,0.8);">
                      <NuxtLink to="/" class="nav-link-black">
                        <v-toolbar-title style="margin: 10px;">
                              <NuxtImg
                                  format="webp"
                                  class="white--text align-end"
                                  width="30"
                                  height="30"
                                  alt="logo"
                                  src="/android-chrome-192x192.png" />
                        </v-toolbar-title>
                      </NuxtLink>
                      <Icon name="mingcute:phone-fill" color="black" width="20" height="20" onclick="window.open('tel:+78129887430');" style="margin-right: 0px; margin-top: -5px;"/>
                      <p onclick="window.open('tel:+78129887430');" style="margin-right: 0px; margin-top: -5px; font-size: 13px;">+7 812 988 74 30</p>
                                <v-spacer />
                    
                        <Icon name="logos:whatsapp-icon" width="35" height="35" onclick="window.open('https://wa.me/79112549960/');" style="margin-right: 20px;"/>
                  
                        <Icon name="logos:telegram" width="30" height="30" onclick="window.open('https://t.me/OBREND78');" style="margin-right: 20px;"/>
                    
                    
                      <Icon name="cib:vk" width="30" height="30" color="#4D76A1" onclick="window.open('https://vk.com/spb_acv');" style="margin-right: 20px;"/>
                    
             
        </v-app-bar>
</template>