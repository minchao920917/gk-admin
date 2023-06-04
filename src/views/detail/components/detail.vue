<template>
    <div class="product-details">
        <div class="product-image">
            <img :src="product.img" :alt="product.title">
        </div>
        <div class="product-info">
            <h1>{{ product.title }}</h1>
            <p class="desc">{{ product.description }}</p>
            <el-tabs v-model="activeName" class="detail-tabs" @tab-click="handleClick">
                <el-tab-pane label="参数" name="first">
                    <div class="tab-container">
                        <ul>
                            <li v-for="(value, key) in product.parameters" :key="key">
                                <strong>{{ key }}:</strong> {{ value }}
                            </li>
                        </ul>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="评论" name="second">
                    <div class="tab-container">
                        <ul>
                            <li v-for="(review, index) in product.reviews" :key="index">
                                <p><strong>{{ review.author }}</strong> {{ review.date }}</p>


                                <div class="cloud-chat">
                                    <div class="cloud-chat-triangle"></div>
                                    <div class="cloud-chat-content">
                                        {{ review.comment }}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="使用说明" name="third">
                    <div class="tab-container">使用说明
                    </div>
                </el-tab-pane>
                <el-tab-pane label="其他补充" name="fourth">
                    <div class="tab-container">其他补充
                    </div>
                </el-tab-pane>
            </el-tabs>

        </div>
    </div>
</template>
  
<script lang="ts">
export default defineComponent({
    name: 'ProductDetails',
    props: {
        product: {
            type: Object,
            required: true,
            default: {
                title: 'Nike Air Max 270',
                img: 'https://www.nike.com/snkrs-static/telemetry/assets/sneaker/b42cbf9d-d70e-4402-b1eb-406c1122790e.png',
                description: 'The Nike Air Max 270 combines the exaggerated tongue from the Air Max 180 and classic elements from the Air Max 93. It features Nike’s biggest heel Air unit yet for a super-soft ride that feels as impossible as it looks.',
                parameters: {
                    Color: 'White/Black/Laser Orange',
                    Style: 'CU0676-101',
                    Country: 'Vietnam'
                },
                reviews: [
                    {
                        author: 'John Smith',
                        date: '2022-05-01',
                        comment: 'I love these shoes! They are very comfortable and look great.'
                    },
                    {
                        author: 'Jane Doe',
                        date: '2022-04-25',
                        comment: 'I have been wearing these shoes for a few weeks now and they are the best sneakers I have ever owned!'
                    }
                ]
            }

        }
    }
})
</script>
<script setup lang="ts">
const activeName = ref('first')
const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}
</script>
<style lang="scss" scoped>
.product-details {
    width: 80%;
    margin: 0 auto;
    margin-top: 70px;

}

.product-image {
    width: 100%;
    height: 200px;
    overflow: hidden;
}

.product-image img {
    max-width: 100%;
    height: auto;
}

.product-info {
    flex-grow: 1;

    .desc {
        line-height: 20px;
    }

    h1 {
        font-size: 28px;
        margin-bottom: 10px;
    }

    h2 {
        font-size: 20px;
        margin-top: 20px;
        margin-bottom: 10px;
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 0;

        li {
            margin-bottom: 5px;

            strong {
                font-weight: bold;
                margin-right: 5px;
            }
        }
    }

    .cloud-chat {
        position: relative;
        display: inline-block;
        padding: 5px 10px;
        border-radius: 10px;
        background-color: #fff;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);

        .cloud-chat-triangle {
            position: absolute;
            top: -10px;
            left: 15px;
            margin-left: -10px;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 10px 10px 10px;
            border-color: transparent transparent #fff transparent;
        }

        .cloud-chat-content {
            padding: 10px;
            font-size: 14px;
            line-height: 1.5;
        }
    }

    .detail-tabs {
        background-color: #fff;

        .tab-container {
            height: 400px;
            overflow: auto;
            padding: 10px;
        }
    }

}
</style>
  