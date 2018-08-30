import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {overrideApiGetTimeline, HeaderComponent, BodyComponent, ButtonComponent, TimelineTableComponent, WaitComponent, ErrorComponent, TweetComponent, UserInfoComponent, TweetInfoComponent} from '../js/components.js';

const create = React.createElement;
jest.mock('../js/service.js');
const mockApiGetTimeline = jest.fn(callback => callback(null, null));

describe('HeaderComponent', () => {
	const wrapper = shallow(create(HeaderComponent));
	it('is a div', () => {
		expect(wrapper.type()).toEqual('div');
	});

	it('intertext says Lab for Dana', () => {
		expect(wrapper.text()).toEqual('Lab for Dana');
	});

	it('has the className: header', () => {
		expect(wrapper.hasClass('header')).toEqual(true);
	});
});

describe('BodyComponent', () => {
	const wrapper = shallow(create(BodyComponent));

	it('is a div', () => {
		expect(wrapper.type()).toEqual('div');
	});

	it('has the className: body', () => {
		expect(wrapper.hasClass('body')).toEqual(true);
	});

	it('body has 2 children', () => {
		let bodyDiv = wrapper.find('.body');
		expect(bodyDiv.children().length).toEqual(2);
	});

	it('body first child is a ButtonComponent', () => {
		let bodyDiv = wrapper.find('.body');
		let firstChild = bodyDiv.childAt(0);
		expect(firstChild.type()).toEqual(ButtonComponent);
	});

	it('body second child is a TimelineTableComponent', () => {
		let bodyDiv = wrapper.find('.body');
		let secondChild = bodyDiv.childAt(1);
		expect(secondChild.type()).toEqual(TimelineTableComponent);
	});
});

describe('ButtonComponent', () => {
	let count = 0;
	const counter = () => {
		count = count + 1;
	}

	let buttonProps = { key: "ButtonComponent", id: "test", handler: counter, buttonText: "test text" };
	const wrapper = shallow(create(ButtonComponent, buttonProps));

	it('is a button', () => {
		expect(wrapper.type()).toEqual('button');
	});

	it('intertext says test text', () => {
		expect(wrapper.text()).toEqual(buttonProps.buttonText);
	});

	it('has the className: button', () => {
		expect(wrapper.hasClass('button')).toEqual(true);
	});

	it('has the id: test', () => {
		expect(wrapper.find('#test').length).toEqual(1);
	});

	it('click performs function', () => {
		wrapper.simulate('click');
		expect(count).toEqual(1);
	});
});

describe('WaitComponent', () => {
	const wrapper = shallow(create(WaitComponent));
	it('is a div', () => {
		expect(wrapper.type()).toEqual('div');
	});

	it('intertext says Retrieving information, please wait!', () => {
		expect(wrapper.text()).toEqual('Retrieving information, please wait!');
	});

	it('has the className: wait', () => {
		expect(wrapper.hasClass('wait')).toEqual(true);
	});
});

describe('ErrorComponent', () => {
	const wrapper = shallow(create(ErrorComponent));
	it('is a div', () => {
		expect(wrapper.type()).toEqual('div');
	});

	it('intertext says An error has occurred. Please contact your administration.', () => {
		expect(wrapper.text()).toEqual('An error has occurred. Please contact your administration.');
	});

	it('has the className: error', () => {
		expect(wrapper.hasClass('error')).toEqual(true);
	});
});

describe('TimelineTableComponent', () => {
	let timelineWaitProps = { key: "timelineTableComponent", data: null, error: null };
	let timelineErrorProps = { key: "timelineTableComponent", data: null, error: "Fake Error" };
	let timelineSuccessProps = { key: "timelineTableComponent", data: [null, null, null], error: null };

	it('is a div', () => {
		const wrapper = shallow(create(TimelineTableComponent, timelineSuccessProps));
		expect(wrapper.type()).toEqual('div');
	});

	it('has the className: tweetTable', () => {
		const wrapper = shallow(create(TimelineTableComponent, timelineSuccessProps));
		expect(wrapper.hasClass('tweetTable')).toEqual(true);
	});

	it('WaitProps has 1 child', () => {
		const wrapper = shallow(create(TimelineTableComponent, timelineWaitProps));
		expect(wrapper.children().length).toEqual(1);
	});

	it('WaitProps\'s child is WaitComponent', () => {
		const wrapper = shallow(create(TimelineTableComponent, timelineWaitProps));
		expect(wrapper.childAt(0).type()).toEqual(WaitComponent);
	});

	it('ErrorProps has 1 child', () => {
		const wrapper = shallow(create(TimelineTableComponent, timelineErrorProps));
		expect(wrapper.children().length).toEqual(1);
	});

	it('ErrorProps\'s child is ErrorComponent', () => {
		const wrapper = shallow(create(TimelineTableComponent, timelineErrorProps));
		expect(wrapper.childAt(0).type()).toEqual(ErrorComponent);
	});

	it('SuccessProps has 3 children', () => {
		const wrapper = shallow(create(TimelineTableComponent, timelineSuccessProps));
		expect(wrapper.children().length).toEqual(3);
	});

	it('SuccessProps\'s children are TweetComponents', () => {
		const wrapper = shallow(create(TimelineTableComponent, timelineSuccessProps));
		expect(wrapper.childAt(0).type()).toEqual(TweetComponent);
		expect(wrapper.childAt(1).type()).toEqual(TweetComponent);
		expect(wrapper.childAt(2).type()).toEqual(TweetComponent);
	});
});

describe('TweetComponent', () => {
	let tweetProps = { key: "tweetComponent0", index: 0, tweet: { user: null } };
	const wrapper = shallow(create(TweetComponent, tweetProps));

	it('is a div', () => {
		expect(wrapper.type()).toEqual('div');
	});

	it('has the className: tweetRow', () => {
		expect(wrapper.hasClass('tweetRow')).toEqual(true);
	});

	it('tweetRow has 2 children', () => {
		let tweetRowDiv = wrapper.find('.tweetRow');
		expect(tweetRowDiv.children().length).toEqual(2);
	});

	it('tweetRow first child is a UserInfoComponent', () => {
		let tweetRowDiv = wrapper.find('.tweetRow');
		let firstChild = tweetRowDiv.childAt(0);
		expect(firstChild.type()).toEqual(UserInfoComponent);
	});

	it('tweetRow second child is a TweetInfoComponent', () => {
		let tweetRowDiv = wrapper.find('.tweetRow');
		let secondChild = tweetRowDiv.childAt(1);
		expect(secondChild.type()).toEqual(TweetInfoComponent);
	});
})

describe('UserInfoComponent', () => {
	let fakeUser = { profileImageUrl: null, name: "testName", twitterHandle: "testHandle" };
	let userInfoProps = { key: "userInfoComponent0", index: 0, user: fakeUser };
	const wrapper = shallow(create(UserInfoComponent, userInfoProps));
	
	it('is a div', () => {
		expect(wrapper.type()).toEqual('div');
	});

	it('has the className: userInfo', () => {
		expect(wrapper.hasClass('userInfo')).toEqual(true);
	});

	it('userInfo has 3 children', () => {
		let userInfoDiv = wrapper.find('.userInfo');
		expect(userInfoDiv.children().length).toEqual(3);
	});

	it('userInfo first child is an img', () => {
		let userInfoDiv = wrapper.find('.userInfo');
		let firstChild = userInfoDiv.childAt(0);
		expect(firstChild.type()).toEqual('img');
	});

	it('userInfo first child has className: userImg', () => {
		let userInfoDiv = wrapper.find('.userInfo');
		let firstChild = userInfoDiv.childAt(0);
		expect(firstChild.hasClass('userImg')).toEqual(true);
	});

	it('userInfo second child is an div', () => {
		let userInfoDiv = wrapper.find('.userInfo');
		let secondChild = userInfoDiv.childAt(1);
		expect(secondChild.type()).toEqual('div');
	});

	it('userInfo second child has className: userName', () => {
		let userInfoDiv = wrapper.find('.userInfo');
		let secondChild = userInfoDiv.childAt(1);
		expect(secondChild.hasClass('userName')).toEqual(true);
	});

	it('userInfo second child text is testName', () => {
		let userInfoDiv = wrapper.find('.userInfo');
		let secondChild = userInfoDiv.childAt(1);
		expect(secondChild.text()).toEqual(fakeUser.name);
	});

	it('userInfo third child is an div', () => {
		let userInfoDiv = wrapper.find('.userInfo');
		let thirdChild = userInfoDiv.childAt(2);
		expect(thirdChild.type()).toEqual('div');
	});

	it('userInfo third child has className: userHandle', () => {
		let userInfoDiv = wrapper.find('.userInfo');
		let thirdChild = userInfoDiv.childAt(2);
		expect(thirdChild.hasClass('userHandle')).toEqual(true);
	});

	it('userInfo third child text is testHandle', () => {
		let userInfoDiv = wrapper.find('.userInfo');
		let thirdChild = userInfoDiv.childAt(2);
		expect(thirdChild.text()).toEqual(fakeUser.twitterHandle);
	});
});

describe('TweetInfoComponent', () => {
	let fakeTweet = { message: "This is an example tweet.", link: null, createdAt: new Date(2018, 11, 24) };
	let tweetInfoProps = { key: "tweetInfoComponent0", index: 0, tweet: fakeTweet };
	const wrapper = shallow(create(TweetInfoComponent, tweetInfoProps));
	
	it('is a div', () => {
		expect(wrapper.type()).toEqual('div');
	});

	it('has the className: tweetInfo', () => {
		expect(wrapper.hasClass('tweetInfo')).toEqual(true);
	});

	it('tweetInfo has 2 children', () => {
		let tweetInfoDiv = wrapper.find('.tweetInfo');
		expect(tweetInfoDiv.children().length).toEqual(2);
	});

	it('tweetInfo first child is a div', () => {
		let tweetInfoDiv = wrapper.find('.tweetInfo');
		let firstChild = tweetInfoDiv.childAt(0);
		expect(firstChild.type()).toEqual('div');
	});

	it('tweetInfo first child has the className: date', () => {
		let tweetInfoDiv = wrapper.find('.tweetInfo');
		let firstChild = tweetInfoDiv.childAt(0);
		expect(firstChild.hasClass('date')).toEqual(true);
	});

	it('date has the text of Dec 24', () => {
		let tweetInfoDiv = wrapper.find('.tweetInfo');
		let firstChild = tweetInfoDiv.childAt(0);
		expect(firstChild.text()).toEqual("Dec 24");
	});

	it('tweetInfo second child is a link', () => {
		let tweetInfoDiv = wrapper.find('.tweetInfo');
		let secondChild = tweetInfoDiv.childAt(1);
		expect(secondChild.type()).toEqual('a');
	});

	it('link has 1 child', () => {
		let link = wrapper.find('.tweetInfo').childAt(1);
		expect(link.children().length).toEqual(1);
	});

	it('link\'s child is a div', () => {
		let link = wrapper.find('.tweetInfo').childAt(1);
		let linkChild = link.childAt(0);
		expect(linkChild.type()).toEqual('div');
	});

	it('link\'s child has the className: message', () => {
		let link = wrapper.find('.tweetInfo').childAt(1);
		let linkChild = link.childAt(0);
		expect(linkChild.hasClass('message')).toEqual(true);
	});

	it('link\'s child has message from fake tweet', () => {
		let link = wrapper.find('.tweetInfo').childAt(1);
		let linkChild = link.childAt(0);
		expect(linkChild.text()).toEqual(fakeTweet.message);
	});
});