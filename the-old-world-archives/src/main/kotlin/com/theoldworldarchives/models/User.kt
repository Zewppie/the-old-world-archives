package com.theoldworldarchives.models

import kotlinx.serialization.Serializable
import java.util.concurrent.atomic.AtomicInteger
import org.jetbrains.exposed.sql.*

@Serializable
data class User(val name: String, val password: String) {
    companion object {
        fun new(name: String, password: String): User {
            return User(name, password)
        }
    }
}

object Users : Table() {
    val name = varchar("name", 128)
    val password = varchar("password", 128)

    override val primaryKey = PrimaryKey(this.name)
}
