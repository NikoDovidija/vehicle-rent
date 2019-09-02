<template>
      <v-row class="car-card pb-4 ">
              <v-col class="col-xs-12 col-md-4 pa-4 fill-height">
                  <div class="d-flex">
                        <h2>{{itemObj.vehicle.example.name}}</h2>
                  </div>
                    <div class="d-flex pa-3">
                        <v-img
                            :src="mainImgUrl"
                            contain
                            height="125"
                            lazy-src="https://www.vehicle-rent.com/_nuxt/img/a28f992.svg"
                        ></v-img>
                  </div>
                    <div class="d-flex pa-3 align-center">
                        <div>
                            <h4>{{itemObj.pickupBranch.vendor.name}}</h4>
                        </div>
                        <div>
                            <v-img
                            :src="itemObj.pickupBranch.vendor.logoURL"
                            height="50"
                            max-width="75"
                            contain
                        ></v-img>
                        </div>
                  </div>
                  <div class="d-flex pa-4 align-center">
                        <div>
                            <h4>{{itemObj.pickupBranch.location.name}}</h4>
                        </div>
                  </div>
              </v-col>
          <v-col class="col-xs-12 col-md-4">
            <div class="pa-3">
             <div class="flex">
                 <div>
                    <h4>Budget package</h4>
                 </div>
                 <div>
                    <h3>{{offerPriceBasic}}</h3>
                 </div>
                  </div>
            </div>
          </v-col>
           <v-col class="col-xs-12 col-md-4">
            <div class=" pa-3">
             <div class="flex">
                    <div>
                    <h4>Relax package</h4>
                        </div>
                    <div>
                    <h3>{{offerPriceRelax}}</h3>
                 </div>
                </div>
            </div>
          </v-col>
      </v-row>
</template>

<script>
import Dinero from 'dinero.js';
export default {
    props: ['item'],
    data(){
        return {
            itemObj:this.item,
            tempImageUrl: "https://www.vehicle-rent.com/_nuxt/img/a28f992.svg",
            mainImgUrl : this.item.vehicle.example.imageURL !== "0" ? 
            this.item.vehicle.example.imageURL : this.tempImageUrl,
            offerPriceBasic:this.generatePrice(this.item.quotes[0].price.offer.total.converted.amount),
            offerPriceRelax:this.generatePrice(this.item.quotes[1].price.offer.total.converted.amount),
        }
    },
    methods:{
        generatePrice(val){
            return Dinero({amount:val,currency:'EUR'}).toFormat('$0,0.00');
        }
    },
}
</script>

<style lang="scss" scoped>
.car-card{
    background: #fff;
    border: 1px solid #d8d8d8;
    position: relative;
}
</style>