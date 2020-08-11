function isValueNumber(value){
    return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value+'');
}

Vue.component('input-number', {
    template: '\
        <div class="input-number">\
            <input \
                type="text" \
                :value="currentValue" \
                @change="handleChange" \
                @keyup.up="handleUp" \
                @keyup.down="handleDown"> \
            <button \
                @click="handleDown" \
                :disabled="currentValue <= min">-</button> \
            <button \
                @click="handleUp" \
                :disabled="currentValue >= max">+</button> \
            <input \
                type="number" \
                :value="currentStep" > \
        </div>',
        props:{
            max:{
                type:Number,
                default: Infinity
            },
            min:{
                type:Number,
                default: -Infinity
            },
            value:{
                type:Number,
                default: 0
            },
            step:{
                type:Number,
                default: 2
            }

        },
        data() {
            return {
                currentValue: this.value,
                currentStep: this.step
            }
        },
        watch: {
            currentValue: function(val){
                this.$emit('input', val);
                this.$emit('on-change',val);
            },
            value: function(val){
                this.updateValue(val);
            }
        },
        methods:{
            updateValue: function(val){
                if (val > this.max) val=this.max;
                if (val < this.min) val=this.min;
                this.currentValue = val;
            },
            handleDown: function(){
                if(this.currentValue <= this.min) return;
                this.currentValue -=this.currentStep;
            },
            handleUp: function(){
                if(this.currentValue >= this.max) return;
                this.currentValue += this.currentStep;
            },
            handleChange: function(event){
                var val = event.target.value.trim();
                var max= this.max;
                var min = this.min;
                if(isValueNumber(val)){
                    val = Number(val);
                    this.currentValue = val;
                    if(val>max){
                        this.currentValue = max;
                    }else if(val<min){
                        this.currentValue = min;
                    }
                }else{
                    event.target.value = this.currentValue;
                    console.log('handle change');
                }
            }
        },
        mounted() {
            this.updateValue(this.value)
        },
});