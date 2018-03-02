window.Event = new Vue();

Vue.component('robot', {
    template: `
              <tr class="robotRow">
                  <td v-text="type"></td>
                  <td v-text="color"></td>
                  <td><a href="#" @click="remove(id)">remove</a></td>
              </tr>
    `,
    
    props: {
        id: {type: Number, default: -1},
        type: {type: String, default: 'type_missing'},
        color: {type: String, default: 'color_missing'}
    },

    data() {
        return {
        }
    },
    
    methods: {
        remove(index) {
           Event.$emit('remove', index) ;
        }
    }
    
});

Vue.component('robots', {
    template: `
        <table class="table robotsTable" @remove="removeRobot(id)" @add="addRobot(type, color)">
          <tbody>
              <robot v-for="(robot, index) in robots" :type="robot.type" :color="robot.color" :id="robot.id"></robot>
          </tbody>
        </table>
    `,
    
    props: {
        initialRobots: {type: Array, required: false, default: () => []}
    },
    
    data() {
        return {
            robots: [],
            id: 0
        }
    },
    
    computed: {
    },
    
    mounted() {
    },
    
    created() {
        this.robots = this.initialRobots;

        Event.$on('add', (type, color) => {
// alert("got add");
            // this.robots.push({type: type, color: color});
            let id = ++this.id;
            this.robots.push({id: id, type: type, color: color});
        });

        Event.$on('remove', (id) => {
// alert("got remove id = " + id);
            let index = this.robots.find((robot, index) => {
// console.log('id = ' + id + ', index = ' + index);
                if ( robot.id == id )
                    return index;
            });
            this.robots.splice(index, 1);
        });
    },
    
    methods: {
    }
    
});
