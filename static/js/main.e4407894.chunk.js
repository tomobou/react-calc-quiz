(this.webpackJsonptomobou=this.webpackJsonptomobou||[]).push([[0],{14:function(t,e,n){},15:function(t,e,n){"use strict";n.r(e);var r=n(1),i=n(2),s=n(5),u=n(4),c=n(3),a=n.n(c),o=n(7),h=n.n(o);function l(t){for(var e=t.length-1;e>0;e=0|e-1){var n=0|Math.random()*(e+1),r=t[e];t[e]=t[n],t[n]=r}return t}var j=new(function(){function t(){Object(r.a)(this,t),this.name="10\u307e\u3067\u306e\u305f\u3057\u3056\u3093"}return Object(i.a)(t,[{key:"quizs",value:function(t){for(var e=Array(),n=0;n<10;n++)for(var r=0;r<10;r++)e.push({q:"".concat(n," + ").concat(r," ="),a:n+r});return e=l(e.filter((function(t){return t.a<=10}))),t?e.slice(0,Math.min(t,e.length)):e}}]),t}()),m=new(function(){function t(){Object(r.a)(this,t),this.name="10\u304b\u30890\u307e\u3067\u306e\u3072\u304d\u3056\u3093"}return Object(i.a)(t,[{key:"quizs",value:function(t){for(var e=Array(),n=0;n<10;n++)for(var r=0;r<10;r++)e.push({q:"".concat(n," - ").concat(r," ="),a:n-r});return e=l(e.filter((function(t){return t.a>=0}))),t?e.slice(0,Math.min(t,e.length)):e}}]),t}()),d=new(function(){function t(){Object(r.a)(this,t),this.name="\u304f\u308a\u3042\u304c\u308a\u306e\u3042\u308b\u305f\u3057\u3056\u3093"}return Object(i.a)(t,[{key:"quizs",value:function(t){for(var e=Array(),n=0;n<10;n++)for(var r=0;r<10;r++)e.push({q:"".concat(n," + ").concat(r," ="),a:n+r});return e=l(e.filter((function(t){return t.a>10}))),t?e.slice(0,Math.min(t,e.length)):e}}]),t}()),b=new(function(){function t(){Object(r.a)(this,t),this.name="\u304f\u308a\u3055\u304c\u308a\u306e\u3042\u308b\u3072\u304d\u3056\u3093"}return Object(i.a)(t,[{key:"quizs",value:function(t){for(var e=Array(),n=11;n<20;n++)for(var r=0;r<10;r++)e.push({q:"".concat(n," - ").concat(r," ="),a:n-r});return e=l(e.filter((function(t){return t.a<9}))),t?e.slice(0,Math.min(t,e.length)):e}}]),t}()),f=n(0),v=function(t){Object(s.a)(n,t);var e=Object(u.a)(n);function n(t){var i;return Object(r.a)(this,n),(i=e.call(this,t)).quizButtons=Array(),i.quizButtons.push({name:"\u308c\u3093\u3057\u3085\u3046",remarks:"\uff13\u3082\u3093",color:"#D8898A",quizBook:j,quizCount:3}),i.quizButtons.push({name:"\u305f\u3057\u3056\u3093\uff11",remarks:"\u305c\u3093\u3076",color:"#D8898A",quizBook:j}),i.quizButtons.push({name:"\u3072\u304d\u3056\u3093\uff12",remarks:"\uff15\u3082\u3093",color:"#84B7DC",quizBook:m,quizCount:5}),i.quizButtons.push({name:"\u3072\u304d\u3056\u3093\uff12",remarks:"\u305c\u3093\u3076",color:"#84B7DC",quizBook:m}),i.quizButtons.push({name:"\u305f\u3057\u3056\u3093\uff13",remarks:"\uff15\u3082\u3093",color:"#F8BA62",quizBook:d,quizCount:5}),i.quizButtons.push({name:"\u305f\u3057\u3056\u3093\uff13",remarks:"\u305c\u3093\u3076",color:"#F8BA62",quizBook:d}),i.quizButtons.push({name:"\u3072\u304d\u3056\u3093\uff14",remarks:"\uff15\u3082\u3093",color:"#86A884",quizBook:b,quizCount:5}),i.quizButtons.push({name:"\u3072\u304d\u3056\u3093\uff14",remarks:"\u305c\u3093\u3076",color:"#86A884",quizBook:b}),i}return Object(i.a)(n,[{key:"render",value:function(){var t=this;return Object(f.jsxs)("div",{className:"questioner",children:[Object(f.jsx)("h5",{children:"\u3082\u3093\u3060\u3044\u3092\u3048\u3089\u3093\u3067\u306d\uff01"}),Object(f.jsx)("div",{className:"question-select",children:this.quizButtons.map((function(e,n){return Object(f.jsxs)("div",{className:"question-select-item",style:{backgroundColor:e.color},onClick:function(){return t.props.setQuizs(e.quizBook.quizs(e.quizCount))},children:[Object(f.jsx)("div",{className:"question-select-item-name",children:e.name}),Object(f.jsx)("div",{className:"question-select-item-remarks",children:e.remarks})]},"question-select-item-"+n)}))})]})}}]),n}(a.a.Component),z=function(t){Object(s.a)(n,t);var e=Object(u.a)(n);function n(){return Object(r.a)(this,n),e.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){var t=this;return this.props.currentQuiz?Object(f.jsxs)("div",{className:"questioner",children:[Object(f.jsxs)("h5",{children:[this.props.whichQuiz+1,"\u554f\u76ee\uff08\u305c\u3093\u3076\u3067 ",this.props.quizs.length," \u554f\uff09"]}),Object(f.jsxs)("div",{className:"question-content",children:[this.props.currentQuiz&&this.props.currentQuiz.q,this.props.wrongCount>0&&Object(f.jsx)("div",{className:"shake",children:"".padStart(this.props.wrongCount,"\xd7")})]})]}):Object(f.jsx)(v,{setQuizs:function(e){return t.props.setQuizs(e)}})}}]),n}(a.a.Component);function O(t){var e=t.reduce((function(t,e){return t+(e.wrongCount>0?1:0)}),0)/t.length*100,n=5;n=e<=5?5:e<=15?4:e<=20?3:e<=30?2:1;var r=t.reduce((function(t,e){return t+(e.endTime-e.startTime)}),0)/t.length,i=5;return i=r<=1200?5:r<=2e3?4:r<=5e3?3:r<=7e3?2:1,Math.min(n,i).toString()}var p=function(t){Object(s.a)(n,t);var e=Object(u.a)(n);function n(t){var i,s;return Object(r.a)(this,n),(i=e.call(this,t)).totalLapTime=(s=i.props.results).reduce((function(t,e){return t.endTime>e.endTime?t:e})).endTime-s.reduce((function(t,e){return t.startTime<e.startTime?t:e})).startTime,i.state={active:""},i}return Object(i.a)(n,[{key:"hiddenResult",value:function(){this.setState({active:"hidden"})}},{key:"render",value:function(){var t=this,e=this.props.results.sort((function(t,e){return t.wrongCount-e.wrongCount===0?t.endTime-t.startTime-(e.endTime-e.startTime):t.wrongCount-e.wrongCount})).reverse();return Object(f.jsxs)("div",{className:["answer-result",this.state.active].join(" "),onClick:function(){return t.hiddenResult()},children:[Object(f.jsx)("div",{children:"\u3057\u3085\u3046\u308a\u3087\u3046\u30fc"}),Object(f.jsxs)("div",{children:[this.totalLapTime/1e3,"\u79d2\u3067\u3067\u304d\u305f\u3088\u3002"]}),Object(f.jsx)("img",{src:"".concat("/react-calc-quiz","/img/grade").concat(O(e),".png"),alt:"grade"}),Object(f.jsxs)("table",{className:"answer-results-view",children:[Object(f.jsx)("thead",{children:Object(f.jsxs)("tr",{children:[Object(f.jsx)("th",{children:"\u554f\u984c"}),Object(f.jsx)("th",{children:"\u9593\u9055\u3048\u305f\u6570"}),Object(f.jsx)("th",{children:"\u56de\u7b54\u6642\u9593"})]})}),Object(f.jsx)("tbody",{children:e.map((function(t,e){var n=t.endTime-t.startTime,r=t.wrongCount>0?"red":"",i=n<=1200?"":n<3e3?"yellow":"red";return Object(f.jsxs)("tr",{children:[Object(f.jsx)("td",{children:t.quiz.q}),Object(f.jsxs)("td",{className:["align-right",r].join(" "),children:[t.wrongCount,"\u56de"]}),Object(f.jsxs)("td",{className:["align-right",i].join(" "),children:[(n/1e3).toFixed(3),"\u79d2"]})]},"answer-results-row-"+e)}))})]})]})}}]),n}(a.a.Component),q=n(8),g=function(t){Object(s.a)(n,t);var e=Object(u.a)(n);function n(){return Object(r.a)(this,n),e.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){var t=this,e=Object(q.a)(Array(21)).map((function(t,e){return e.toString()})),n=Array(),r=0,i=0;n[r]=[];for(var s=0;s<e.length;s++)n[r][i]=e[s],i++,parseInt(e[s])%5===0&&(n[++r]=[],i=0);return Object(f.jsx)("div",{className:"number-selector",children:n.map((function(e,n){return Object(f.jsx)("div",{className:"number-selector-row",children:e.map((function(e){return Object(f.jsx)("button",{className:"number-selector-item",onClick:function(){return t.props.onClick(e)},children:e},"number-selector-item"+e)}))},"number-selector-row-"+n)}))})}}]),n}(a.a.Component),w=(n(14),function(t){Object(s.a)(n,t);var e=Object(u.a)(n);function n(t){var i;return Object(r.a)(this,n),(i=e.call(this,t)).state={quizs:[],results:[],currentQuiz:void 0,whichQuiz:-1,wrongCount:0},i}return Object(i.a)(n,[{key:"handleSelect",value:function(t){var e=this;if(this.state.currentQuiz)if(this.state.currentQuiz.a===parseInt(t)){var n=Date.now(),r=this.state.results,i=r.length>0?r[r.length-1].endTime:this.state.startTime;r.push({quiz:this.state.currentQuiz,wrongCount:this.state.wrongCount,startTime:i,endTime:n}),this.state.whichQuiz+1===this.state.quizs.length?this.setState((function(t){return{currentQuiz:void 0,results:r,whichQuiz:-1,endTime:Date.now(),wrongCount:0}})):this.setState((function(t){return{currentQuiz:e.state.quizs[e.state.whichQuiz+1],results:r,whichQuiz:e.state.whichQuiz+1,wrongCount:0}}))}else this.setState((function(t){return{wrongCount:e.state.wrongCount+1}}))}},{key:"handleStart",value:function(t){this.setState((function(e){return{quizs:t,results:[],currentQuiz:t.length>0?t[0]:void 0,whichQuiz:0,startTime:Date.now(),endTime:void 0}}))}},{key:"render",value:function(){var t=this;return Object(f.jsxs)("div",{className:"game",children:[Object(f.jsx)(z,{quizs:this.state.quizs,currentQuiz:this.state.currentQuiz,whichQuiz:this.state.whichQuiz,setQuizs:function(e){return t.handleStart(e)},wrongCount:this.state.wrongCount}),Object(f.jsx)(g,{onClick:function(e){return t.handleSelect(e)}}),this.state.endTime&&Object(f.jsx)(p,{results:this.state.results})]})}}]),n}(a.a.Component));h.a.render(Object(f.jsx)(w,{}),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.e4407894.chunk.js.map