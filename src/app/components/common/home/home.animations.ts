import {
  trigger,
  state,
  animate,
  transition,
  style
} from '@angular/animations';


export const homeAnimations = [

  trigger('scrollAnimation', [
    state('show', style({
      opacity: 1,
      transform: "translateX(0)"
    })),
    state('hide', style({
      opacity: 0,
      transform: "translateX(-100%)"
    })),
    transition('show => hide', animate('3700ms ease-out')),
    transition('hide => show', animate('3700ms ease-in'))
  ]),

  trigger('scrollAnimation2', [
    state('show', style({
      opacity: 1,
      transform: "translateX(0)"
    })),
    state('hide', style({
      opacity: 0,
      transform: "translateX(+100%)"
    })),
    transition('show => hide', animate('3000ms ease-out')),
    transition('hide => show', animate('3000ms ease-in'))
  ]),


  trigger('divState', [
    state('hide', style({
      transform: "translate(+100%, -100%)",
      opacity: 0,
    })),
    state('show', style({
      transform: 'translateX(0)',
      opacity: 1,
    })),
    transition("hide <=> show", animate(3000))
  ]),

  trigger('divState2', [
    state('hide', style({
      transform: "translateX(-100%)",
      opacity: 0,
    })),
    state('show', style({
      transform: 'translateX(0)',
      opacity: 1,
    })),
    transition("show <=> hide", animate(3000))
  ]),
]