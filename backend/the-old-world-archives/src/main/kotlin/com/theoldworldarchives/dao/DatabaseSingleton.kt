package com.theoldworldarchives.dao

import com.theoldworldarchives.models.*
import kotlinx.coroutines.*
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.*
import org.jetbrains.exposed.sql.transactions.experimental.*

object DatabaseSingleton {
    fun init() {
        val driverClassName = "org.h2.Driver"
        val jdbcURL = "jdbc:h2:file:./build/db"
        val database = Database.connect(jdbcURL, driverClassName)
        transaction(database) {
            SchemaUtils.create(Comments)
            SchemaUtils.create(Posts)
            SchemaUtils.create(Users)
            SchemaUtils.create(Liked)
        }
    }

    fun reset() {
        val driverClassName = "org.h2.Driver"
        val jdbcURL = "jdbc:h2:file:./build/db"
        val database = Database.connect(jdbcURL, driverClassName)
        transaction(database) {
            SchemaUtils.drop(Comments)
            SchemaUtils.drop(Liked)
            SchemaUtils.drop(Posts)
            SchemaUtils.drop(Users)
            SchemaUtils.create(Posts)
            SchemaUtils.create(Users)
            SchemaUtils.create(Liked)
            SchemaUtils.create(Comments)
        }
    }

    suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }
}