import {customElement, bindable} from 'aurelia-templating';
import {inject} from 'aurelia-dependency-injection';
import {EventAggregator} from 'aurelia-event-aggregator';
import {RadioButtonSelectedEvent} from './radiobuttonselectedevent';

@inject(EventAggregator)
@customElement('radio-button')
@bindable('label')
@bindable('selected')
@bindable('disabled')
@bindable('onselecting')
@bindable({
  attribute: 'group-name',
  name: 'groupName'
})
@bindable({
  name: 'grabFocus',
  attribute: 'grab-focus',
  defaultValue: false
})
@bindable({
  name: 'iconFamilyClass',
  attribute: 'icon-family-class',
  defaultValue: 'fa'
})
@bindable({
  name: 'selectedIconClass',
  attribute: 'selected-icon-class',
  defaultValue: 'fa-circle'
})
export class RadioButton {

  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;
    this.onselecting = () => true;
  }

  bind() {
    this.selectedEventSubscription = this.eventAggregator.subscribe(RadioButtonSelectedEvent, this._handleButtonSelected.bind(this));
  }

  unbind() {
    this.selectedEventSubscription.dispose();
  }

  clicked() {
    if (this.disabled !== true) {
      if (this.onselecting()) {
        this.selected = !this.selected;
        this.eventAggregator.publish(new RadioButtonSelectedEvent(this.groupName, this.label));
      }
    }
  }

  _handleButtonSelected(event) {
    if (event.groupName === this.groupName) {
      this.selected = (this.label === event.buttonLabel);
    }
  }
}