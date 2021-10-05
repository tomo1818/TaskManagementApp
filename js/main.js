// ドラッグ&ドロップ
const draggable = window['vuedraggable'];

class Section {
  constructor() {
    this.title;
    this.id;
    this.tasks;
  }
}

class Task {
  constructor(id) {
    this.title;
    this.detail;
    this.id = id;
  }
}

var newTask = {
  props: ['name', 'task', 'section', 'index'],
  data: function() {
    return {
      curTask: this.task,
      parentSection: this.section,
      i: this.index,
      starColor: {
        color: ''
      },
      checkColor: {
        color: ''
      }
    }
  },
  template: `
    <div id="task" class="p-2 shadow-sm mb-2">
      <div>
        <input class="mb-2 shadow full-width" @input="changeTaskTitle">
      </div>
      <div>
        <p>category : {{ name }}</p>
      </div>
      <div>
        <textarea @input="changeTaskDetail" name="" id="textarea" cols="30"></textarea>
      </div>
      <div class="text-right">
        <button @click="getFocus" type="button" class="v-icon notranslate v-icon--link mdi mdi-note theme--light"></button>
        <button @click="colorGreen" v-bind:style="checkColor" type="button" class="v-icon notranslate v-icon--link mdi mdi-check-bold theme--light"></button>
        <button @click="colorYellow" v-bind:style="starColor" type="button" class="v-icon notranslate v-icon--link mdi mdi-star theme--light"></button>
        <button @click="$emit('delete-task', this.i)" type="button" class="v-icon notranslate v-icon--link mdi mdi-delete theme--light"></button>
      </div>
    </div>
  `,
  methods: {
    getFocus: function(event) {
      let textarea = event.target.closest("#task").querySelectorAll("textarea")[0];
      textarea.focus();
    },
    changeTaskTitle: function(event) {
      this.curTask.title = event.target.value;
    },
    changeTaskDetail: function(event) {
      this.curTask.detail = event.target.value;
    },
    colorYellow: function(event) {
      event.target.blur();
      if (this.starColor.color == '') this.starColor.color = 'yellow';
      else this.starColor.color = '';
    },
    colorGreen: function(event) {
      event.target.blur();
      if (this.checkColor.color == '') this.checkColor.color = 'green';
      else this.checkColor.color = '';
    }
  }
}

// var task = {
//   props: ['section'],
//   data() {
//     return {
//       curSection: this.section
//     }
//   },
//   template: `

//   `,
// }

var newSection = {
  props: ['section'],
  data: function() {
    return {
      id: 0,
      tasks: [],
      sectionName: '',
      curSection: this.section
    }
  },
  components: {
    'new-task': newTask,
    'draggable': draggable,
  },
  template: `
  <div class="full-width-sm" tag="div">
    <div class="p-2 section shadow-sm">
      <div class="mb-3">
        <input class="shadow full-width" placeholder="セクション名" @input="changeSectionName">
      </div>
      <div>
        <new-task v-for="(task, index) in tasks" v-bind:key="index" v-bind:name="sectionName" v-bind:section="curSection" v-bind:task="task" v-bind:index="index" v-on:delete-task="deleteTask"></new-task>
      </div>
    </div>
    <div class="mt-2-sm">
        <button @click="createTask" class="btn btn-outline-primary">+</button>
    </div>
  </div>
  `,
  methods: {
    createTask: function() {
      this.tasks.push(new Task(this.id));
      this.id++;
    },
    changeSectionName: function(event) {
      this.sectionName = event.target.value;
    },
    deleteTask: function(index) {
      this.tasks.splice(index, 1)
    }
  }
}

      // <draggable tag="div" :options="{group:'TASKS'}">
      //   <new-task v-for="task in tasks" v-bind:key="task.id" v-bind:name="sectionName" v-bind:section="curSection" v-bind:task="task" v-on:delete-task="deleteTask"></new-task>
      // </draggable>

var taskApp = new Vue({
  el: '#taskApp',
  data() {
    return {
      sections: [],
      id: 0,
    }
  },
  methods: {
    addSection: function(id) {
      this.sections.push(new Section(id));
      this.id++;
    }
  },
  components: {
    'new-section': newSection,
  }
});
