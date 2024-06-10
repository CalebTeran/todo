import {getUniqueId} from "./uuid-generator-helpers"

describe("uuid Generator Helpers", () =>{
    describe("getUniqueId()", ()=>{
        it("should return a uuid based on how long you want", ()=>{
            const uuid = getUniqueId(1);
            const uuid2 = getUniqueId(2);
            const uuid3 = getUniqueId(3);
            expect(uuid2.includes("-")).toBeTruthy();
            expect(uuid2.length).toBe(9);
            expect(uuid.includes("-")).toBeFalsy();
            expect(uuid.length).toBe(4);
            expect(uuid3.includes("-")).toBeTruthy();
            expect(uuid3.length).toBe(14);
        });
        it("should return a error message when you try to set a uuid with a long less than 1", ()=>{
            const uuid = getUniqueId(0);
            expect(uuid).toBe("Your uuid cannot be less than 1")
        });
    });
});