let chai = require('chai');

describe("Server Ttests", () => {

    it("should pass ", () =>{
        chai.expect("test").to.eql("test");
    });

    it("should fail for should pass ", () =>{
        chai.expect("test3").to.eql("test3");
    });

    it("should pass ", () =>{
        chai.expect("test2").to.eql("test2");
    });
});