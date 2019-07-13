import { throws } from "assert";
import { error } from "util";

export function convertAnchorHtml(content: string): string {
    var match = /(#*)\s*\[(.+)\]\(#([0-9\.]+)\)\s*/.exec(content);
    if(!match) {
        throw new Error("match is empty")
    }
    var one = match![1];
    var html_content = match![2];
    var id = match![3].replace(".", "");
    var hCount = one.length;
    return `<h${hCount} id="${id}">${html_content}</h${hCount}>`;
}