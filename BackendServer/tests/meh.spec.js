let chai = require('chai');

describe("meh Ttests", () => {

    it("should pass ", () =>{
        chai.expect("test").to.eql("test");
    });

    it("should fail for testing ", () =>{
        chai.expect("test3").to.eql("test2");
    });

    it("should pass ", () =>{
        chai.expect("test").to.eql("test");
    });
});