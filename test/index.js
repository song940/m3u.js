import assert from 'assert';
import * as m3u from '../index.js';

const test = async (title, fn) => {
  try {
    await fn();
    console.log((` ✔  ${title}`));
  } catch (err) {
    console.error((` ✘  ${title}`));
    throw err;
  }
};

test('m3u#parse', () => {
  const playlist = `
#EXTM3U x-tvg-url="http://195.154.221.171/epg/guidealbania.xml.gz"
#EXTINF:-1 tvg-ID="CH1" tvg-name="Ch 1" tvg-language="English" tvg-country="US" tvg-logo="http://www.rtvchannel.com.au/wp-content/uploads/2017/04/xshow_08.png,Mic_.2KNN9OHw1p.png.pagespeed.ce.2KNN9OHw1p.png" tvg-url="http://195.154.221.171/epg/guide.xml.gz" tvg-rec="3" group-title="Music",Channel 1 (Tested)
#EXTGRP:Только Android
#EXTVLCOPT:http-referrer=http://player.livesports.pw/la2/
#EXTVLCOPT:http-user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.25 Safari/537.36
http://livestream.htp.tv/hls-live/livepkgr/_definst_/H1/H1_HQ.m3u8
#EXTINF:16 tvg-id="CH2",Channel 2
stream/chunklist.m3u8
`;

  const result = m3u.parse(playlist);
  assert.ok(result);
  assert.equal(result.items.length, 2);
  assert.equal(result.items[1].name, 'Channel 2');
});