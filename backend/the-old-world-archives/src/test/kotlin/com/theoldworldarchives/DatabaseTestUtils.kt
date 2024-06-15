package com.theoldworldarchives

import org.jetbrains.exposed.sql.Database

fun connectToTestDatabase() {
    Database.connect(
        url = "jdbc:h2:mem:test;DB_CLOSE_DELAY=-1;",
        driver = "org.h2.Driver"
    )
}

