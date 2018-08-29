import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {HelloComponent} from '../js/hello.js';

const create = React.createElement;

describe('a fake test', () => {
	it("should return true", () => {
		expect(true).toBe(true);
	});
});

describe('HelloComponent', () => {
	it('says Hello React', () => {
		const wrapper = shallow(create(HelloComponent));
		expect(wrapper.text()).to.equal("Hello React!");
	});
});