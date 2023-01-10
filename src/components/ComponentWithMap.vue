<template>

    <!-- <GMapMap
      :center="center"
      :options="options"
      :zoom="10"
      map-type-id="terrain"
      style="width: 100vw; height: 20rem"
    >
      <GMapCluster :zoomOnClick="true">
        <GMapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center = m.position"
        />
      </GMapCluster>
    </GMapMap> -->
    <div class="text-center">
        <h2>ค้นหาจาก googlemap</h2>
        <label>สถานที่:</label>
        <input v-model="address" type="text" />
        &nbsp;
        <label>ประเภทธุรกิจ:</label>
        <input v-model="type" type="text" />
        &nbsp;
        <button class="button" @click="testCall">Search</button>
        <!-- <h6>lat:{{results.lat}} , lng:{{results.lng}}</h6> -->
    </div>

    <GMapMap class="GMapMap" :center="center" :options="options" :zoom="15" map-type-id="terrain">
      <GMapMarker :key="index" v-for="(m, index) in markers" :position="m.position" :label="m.label" :clickable="true" @click="center=m.position" />
    </GMapMap>

    <!-- {{testCall()}} -->
</template>
<!-- <GMapMarker
:key="index"
v-for="(m, index) in markers"
:position="m.position"
:label="m.label"
:clickable="true"
:draggable="true"
@click="center=m.position"
/>
</GMapMap> -->
<script>
    import axios from 'axios';
    
    export default {
        data() {
            return {
                center: { lat: 13.828253, lng: 100.5284507 },
                options: {
                    mapId:'xxx' //here comes your map id
                },
                markers: [
                    // { position: { lat: 13.828253, lng: 100.5284507 } , label: "Marker 1"},
                    // { position: { lat: 13.822253, lng: 100.1254507 } , label: "Marker 2"},
                    // { position: { lat: 13.823253, lng: 100.5244507 } , label: "Marker 3"}
                ],
                query: '',
                results: {},
                address: 'เขตบางซื่อ',
                type: 'ร้านอาหาร',
                radius: 1000,
            };
        },
        methods: {
                testCall() {
                    const url = 'http://localhost:4001/googlemap';
                    axios.post(url, {
                        address: this.address,
                        type: this.type,
                        radius: this.radius,
                    })
                    .then(response => {
                        console.log(response);
                        this.center.lat = response.data.lat;
                        this.center.lng = response.data.lng;
                        this.markers = response.data.array;
                        // console.log(this.markers);
                    })
                    .catch(error => {
                        console.log(error)
                    })
                },
        },
    };
</script>
  
<style>
  body {
    margin: 0;
  }

  .GMapMap {
    width: 100vw; 
    height: 30vw;
    padding: 10px;
  }

  .button {
    width: 100%;
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  input[type=text], select {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  div {
    border-radius: 5px;
    padding: 20px;
  }
</style>
  